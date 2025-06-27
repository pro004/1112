const axios = require('axios');
const cheerio = require('cheerio');

const meta = {
  name: "Terabox Video Player",
  description: "Stream and view videos from Terabox URLs with embedded player",
  path: "/teraboxdl?url=",
  author: "Xrotick",
  method: "get",
  category: "streaming"
};

async function extractTeraboxInfo(url) {
  try {
    // Basic URL validation
    if (!url || !url.includes('terabox') && !url.includes('1024tera')) {
      throw new Error('Invalid Terabox URL provided');
    }

    // Clean the URL
    const cleanUrl = url.trim();
    
    // Method 1: Try direct extraction from Terabox
    const response = await axios.get(cleanUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    
    // Extract video information for streaming
    let videoInfo = {
      title: '',
      size: '',
      streamUrl: '',
      directUrl: '',
      thumbnail: '',
      duration: '',
      type: 'video',
      isVideo: false
    };

    // Try to extract title from various selectors
    videoInfo.title = $('title').text().trim() || 
                     $('.file-name').text().trim() || 
                     $('.filename').text().trim() || 
                     $('h1').first().text().trim() || 
                     'Terabox Video';

    // Try to extract file size
    videoInfo.size = $('.file-size').text().trim() || 
                    $('.size').text().trim() || 
                    $('[data-size]').attr('data-size') || 
                    'Unknown';

    // Look for video streaming URLs
    const streamUrls = [];
    $('video source, video').each((i, elem) => {
      const src = $(elem).attr('src');
      if (src && src.includes('http')) {
        streamUrls.push(src);
        videoInfo.isVideo = true;
      }
    });

    // Look for direct video links in various elements
    $('a[href*=".mp4"], a[href*=".webm"], a[href*=".avi"], a[href*=".mov"]').each((i, elem) => {
      const href = $(elem).attr('href');
      if (href && href.includes('http')) {
        streamUrls.push(href);
        videoInfo.isVideo = true;
      }
    });

    if (streamUrls.length > 0) {
      videoInfo.streamUrl = streamUrls[0];
      videoInfo.directUrl = streamUrls[0];
    }

    // Extract video duration if available
    videoInfo.duration = $('video').attr('duration') || 
                        $('.duration').text().trim() || 
                        $('[data-duration]').attr('data-duration') || 
                        'Unknown';

    // Extract thumbnail for video preview
    const thumbnails = [];
    $('video').each((i, elem) => {
      const poster = $(elem).attr('poster');
      if (poster && poster.includes('http')) {
        thumbnails.push(poster);
      }
    });
    
    $('img[src*="thumb"], img[src*="preview"], meta[property="og:image"]').each((i, elem) => {
      const src = $(elem).attr('src') || $(elem).attr('content');
      if (src && src.includes('http')) {
        thumbnails.push(src);
      }
    });

    if (thumbnails.length > 0) {
      videoInfo.thumbnail = thumbnails[0];
    }

    // If no direct stream found, try alternative extraction from script tags
    if (!videoInfo.streamUrl) {
      $('script').each((i, elem) => {
        const scriptContent = $(elem).html();
        if (scriptContent && (scriptContent.includes('mp4') || scriptContent.includes('video'))) {
          try {
            // Try to extract video URLs from script content
            const urlMatches = scriptContent.match(/https?:\/\/[^\s"'<>]+\.(mp4|webm|avi|mov|mkv)/gi);
            if (urlMatches) {
              videoInfo.streamUrl = urlMatches[0];
              videoInfo.directUrl = urlMatches[0];
              videoInfo.isVideo = true;
            }
          } catch (e) {
            // Continue if parsing fails
          }
        }
      });
    }

    return videoInfo;

  } catch (error) {
    throw new Error(`Failed to extract Terabox info: ${error.message}`);
  }
}

async function onStart({ req, res }) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameter: url',
        usage: 'GET /api/teraboxdl?url=<terabox_url>',
        example: 'GET /api/teraboxdl?url=https://terabox.com/s/1234567890'
      });
    }

    // Validate URL format
    if (!url.includes('terabox') && !url.includes('1024tera')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL. Please provide a valid Terabox URL',
        supportedDomains: ['terabox.com', '1024tera.com']
      });
    }

    const videoInfo = await extractTeraboxInfo(url);

    // If we have a direct video URL, redirect to it for direct video display
    if (videoInfo.streamUrl) {
      // Set headers for video streaming
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      
      // Redirect to the direct video URL
      return res.redirect(302, videoInfo.streamUrl);
    }

    // If no direct stream URL, return video information
    return res.json({
      success: true,
      data: {
        url: url,
        title: videoInfo.title,
        size: videoInfo.size,
        streamUrl: videoInfo.streamUrl || null,
        directUrl: videoInfo.directUrl || null,
        thumbnail: videoInfo.thumbnail || null,
        duration: videoInfo.duration || null,
        type: videoInfo.type,
        isVideo: videoInfo.isVideo,
        extractedAt: new Date().toISOString()
      },
      message: videoInfo.streamUrl ? 
        'Video found - redirecting to direct stream' : 
        'Video information extracted, but direct streaming URL not available',
      note: 'API will redirect directly to video stream when available. Open the API URL in browser to watch video.',
      directAccess: `${req.protocol}://${req.get('host')}/api/teraboxdl?url=${encodeURIComponent(url)}`
    });

  } catch (error) {
    console.error('Terabox API Error:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to process Terabox URL',
      troubleshooting: [
        'Verify the Terabox URL is correct and accessible',
        'Check if the file is publicly available',
        'Some files may require login or have regional restrictions'
      ]
    });
  }
}

module.exports = { meta, onStart };