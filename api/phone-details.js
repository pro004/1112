const https = require('https');
const cheerio = require('cheerio');

const meta = {
  name: "Phone Details",
  description: "Get detailed phone specifications by web scraping",
  path: "/phone-details?model=",
  author: "Xrotick",
  method: "get",
  category: "utility"
};

async function scrapePhoneDetails(phoneModel) {
  return new Promise((resolve, reject) => {
    const searchQuery = encodeURIComponent(phoneModel);
    const options = {
      hostname: 'www.gsmarena.com',
      path: `/results.php3?sQuickSearch=yes&sName=${searchQuery}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const $ = cheerio.load(data);
          const phones = [];
          
          $('.makers li').each((i, element) => {
            if (i < 5) { // Limit to first 5 results
              const name = $(element).find('span').first().text().trim();
              const link = $(element).find('a').attr('href');
              const img = $(element).find('img').attr('src');
              
              if (name && link) {
                phones.push({
                  name: name,
                  link: link,
                  image: img ? `https://www.gsmarena.com/${img}` : null
                });
              }
            }
          });
          
          if (phones.length > 0) {
            // Get detailed specs for the first phone
            getPhoneSpecs(phones[0].link).then(specs => {
              resolve({
                ...phones[0],
                ...specs
              });
            }).catch(() => {
              resolve(phones[0]);
            });
          } else {
            resolve(null);
          }
        } catch (error) {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.setTimeout(10000, () => {
      req.destroy();
      resolve(null);
    });
    req.end();
  });
}

async function getPhoneSpecs(phoneLink) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.gsmarena.com',
      path: phoneLink,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const $ = cheerio.load(data);
          const specs = {};
          
          // Extract basic info
          specs.brand = $('.specs-phone-name-title').text().trim().split(' ')[0];
          specs.model = $('.specs-phone-name-title').text().trim();
          specs.launch_date = $('td[data-spec="year"]').text().trim();
          
          // Extract display info
          specs.display_size = $('td[data-spec="displaysize"]').text().trim();
          specs.display_resolution = $('td[data-spec="displayresolution"]').text().trim();
          specs.display_type = $('td[data-spec="displaytype"]').text().trim();
          
          // Extract performance
          specs.chipset = $('td[data-spec="chipset"]').text().trim();
          specs.cpu = $('td[data-spec="cpu"]').text().trim();
          specs.gpu = $('td[data-spec="gpu"]').text().trim();
          
          // Extract memory
          specs.internal_storage = $('td[data-spec="internalmemory"]').text().trim();
          specs.ram = $('td[data-spec="memoryram"]').text().trim();
          
          // Extract camera
          specs.main_camera = $('td[data-spec="cam1modules"]').text().trim();
          specs.selfie_camera = $('td[data-spec="cam2modules"]').text().trim();
          
          // Extract battery
          specs.battery = $('td[data-spec="batdescription1"]').text().trim();
          specs.charging = $('td[data-spec="batcharging"]').text().trim();
          
          // Extract connectivity
          specs.network = $('td[data-spec="nettech"]').text().trim();
          specs.sim = $('td[data-spec="sim"]').text().trim();
          specs.usb = $('td[data-spec="usb"]').text().trim();
          
          // Extract build
          specs.dimensions = $('td[data-spec="dimensions"]').text().trim();
          specs.weight = $('td[data-spec="weight"]').text().trim();
          specs.build = $('td[data-spec="build"]').text().trim();
          
          // Extract OS
          specs.os = $('td[data-spec="os"]').text().trim();
          
          // Extract price if available
          specs.price = $('.price-tag').text().trim() || 'Not available';
          
          resolve(specs);
        } catch (error) {
          resolve({});
        }
      });
    });

    req.on('error', () => resolve({}));
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({});
    });
    req.end();
  });
}

async function onStart({ req, res }) {
  try {
    const phoneModel = req.query.model;
    
    if (!phoneModel) {
      return res.json({
        status: false,
        message: "Phone model parameter is required",
        example: "/api/phone-details?model=iPhone 15 Pro",
        data: null
      });
    }

    const phoneDetails = await scrapePhoneDetails(phoneModel);
    
    if (!phoneDetails) {
      return res.json({
        status: false,
        message: "Phone not found or unable to retrieve details",
        searched_model: phoneModel,
        data: null
      });
    }

    res.json({
      status: true,
      message: "Phone details retrieved successfully",
      data: {
        searched_model: phoneModel,
        phone_details: phoneDetails,
        source: "GSMArena",
        last_updated: new Date().toISOString()
      }
    });

  } catch (error) {
    res.json({
      status: false,
      message: "Failed to retrieve phone details",
      error: error.message,
      data: null
    });
  }
}

module.exports = { meta, onStart };