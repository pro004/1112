# Xrotick API Documentation

## Overview

Xrotick API is a modern, interactive API documentation and testing platform built with Express.js backend and vanilla HTML/CSS/JavaScript frontend. The system provides a sleek, dark-themed dashboard for developers to explore, test, and integrate APIs with real-time response visualization and comprehensive documentation features.

## System Architecture

### Backend Architecture
- **Framework**: Express.js (Node.js)
- **Server Configuration**: 
  - Port: 4000 (configurable via environment)
  - Trust proxy enabled for deployment compatibility
  - JSON formatting with 2-space indentation
- **Middleware Stack**:
  - JSON body parser for API request handling
  - URL-encoded body parser for form data
  - CORS support for cross-origin requests
  - Custom JSON response middleware for consistent API responses

### Frontend Architecture
- **Technology Stack**: Vanilla HTML, CSS (Tailwind CSS), and JavaScript
- **Design Pattern**: Static file serving from `/web` directory
- **UI Features**:
  - Dark theme with modern animations
  - Responsive design (mobile, tablet, desktop)
  - Interactive API testing interface
  - Real-time JSON response visualization
  - Categorized navigation with search functionality

### Configuration Management
- **Settings File**: `settings.json` for dynamic configuration
- **Exposed Endpoint**: `/settings.json` serves configuration to frontend
- **Customizable Elements**:
  - API metadata (name, version, description)
  - Header configuration with status and imagery
  - External links and contact information
  - System notifications

## Key Components

### 1. Main Server (`index.js`)
- **Purpose**: Core Express server setup and middleware configuration
- **Key Features**:
  - Static file serving for web assets
  - Dynamic API module loading from `/api` directory
  - Custom JSON response formatting with operator attribution
  - Settings exposure for frontend consumption

### 2. API Module System
- **Structure**: Modular API organization in `/api` folder
- **Loading Strategy**: Recursive module discovery and registration
- **Route Counting**: Automatic tracking of total registered routes

### 3. Configuration System (`settings.json`)
- **API Settings**: Operator attribution and metadata
- **UI Configuration**: Header status, images, and sizing
- **External Integrations**: Links and contact information
- **Notification System**: Built-in notification management

### 4. Package Management
- **Dependencies**: 
  - Core: Express.js, CORS, body-parser
  - Utilities: Chalk for logging, Axios for HTTP requests
  - Specialized: Cheerio for HTML parsing, yt-search, spotidownloader
- **Development**: Nodemon for development server

## Data Flow

1. **Request Processing**:
   - Client requests hit Express server
   - Middleware processes JSON/URL-encoded bodies
   - CORS headers applied for cross-origin support
   - Custom JSON middleware enhances responses

2. **Static Asset Serving**:
   - Frontend assets served from `/web` directory
   - Settings configuration exposed via `/settings.json` endpoint

3. **API Module Integration**:
   - Dynamic loading of API modules from `/api` directory
   - Automatic route registration and counting
   - Consistent response formatting across all endpoints

4. **Response Enhancement**:
   - All JSON responses augmented with status and operator information
   - Maintains compatibility with existing API module responses

## External Dependencies

### Runtime Dependencies
- **Express.js**: Web framework for server implementation
- **CORS**: Cross-origin resource sharing support
- **Axios**: HTTP client for external API calls
- **Chalk**: Terminal styling for enhanced logging
- **Cheerio**: Server-side HTML manipulation
- **Node-fetch**: HTTP request library
- **yt-search**: YouTube search functionality
- **spotidownloader**: Spotify content downloading

### Development Dependencies
- **Nodemon**: Development server with auto-reload

## Deployment Strategy

### Platform Support
- **Vercel**: Primary deployment target with `vercel.json` configuration
- **Replit**: Development environment support with `.replit` configuration
- **Local Development**: Standard Node.js server setup

### Environment Configuration
- **Port Management**: Environment variable support with fallback
- **Production Optimizations**: Trust proxy enabled for deployment
- **Static Asset Strategy**: Efficient serving of frontend assets

### Build Process
- **Start Command**: `npm run start` with deprecation warnings disabled
- **Module System**: CommonJS for broad compatibility
- **Nix Integration**: Replit environment with stable channel

## Changelog

- June 27, 2025: Fixed Top 5 APIs display and repositioned layout elements
  - REMOVED hardcoded fake usage numbers from backend API tracking system
  - RESET all API request counters to 0 to show actual usage from fresh start
  - UPDATED Top 5 APIs section to display "No API Usage Yet" message when no APIs have been used
  - FIXED misleading statistics that showed high usage numbers when no one had actually used the APIs
  - REPOSITIONED Top 5 APIs section to appear under time/date widget and above dashboard stats cards
  - REMOVED duplicate Top 5 APIs section and cleaned up layout structure
  - ADDED 10-minute animation delay (600s) to Top 5 APIs section for extended dramatic entrance
  - TRANSFORMED Top 5 APIs to transparent frosted glass design matching Total APIs cards
  - ADDED extensive dynamic effects: sliding entrances, pulsing rank badges, glowing text, bouncing counts
  - ENHANCED styling with larger elements, improved spacing, and sophisticated hover interactions
  - ADDED comprehensive background theme effects: animated gradient shifting, moving grid patterns, floating particles
  - IMPLEMENTED aurora effect with sweeping color gradients across the background
  - CREATED dynamic starfield with 50 twinkling stars randomly positioned and animated
  - ADDED floating orbs with radial gradients that move in complex patterns
  - INTEGRATED pulse rings that expand and fade for ambient visual interest
  - ENHANCED floating shapes with rotation animations and additional gradient colors
  - ADDED background waves with layered movement animations for depth
  - CREATED immersive visual experience with multiple layered background effects
  - CONVERTED time and date widget to transparent frosted glass design matching other cards
  - ADDED BD SIM Offers API (/api/bd-sim-offers) with web scraping for GP, Robi, Banglalink, Airtel offers
  - CREATED Phone Details API (/api/phone-details) with GSMArena web scraping for device specifications
  - INTEGRATED new APIs into tracking system and frontend mapping for Top 5 APIs display
  - ENHANCED utility category with Bangladesh-specific telecom and device information services
  - ENHANCED user experience with accurate real-time API usage tracking and improved layout flow
  - System now properly shows zero usage until APIs are actually called by users
  - Maintains all visual effects and real-time polling functionality with authentic data

- June 27, 2025: Full-page ripple effects and real-time API tracking implementation
  - EXTENDED ripple effects to entire /docs page with universal touch/click feedback
  - IMPLEMENTED real-time API request tracking system with backend integration
  - CREATED live API statistics endpoint (/api/stats) with automatic polling every 5 seconds
  - ADDED animated count updates with scale and color transitions when requests increment
  - ENHANCED tracking system monitors all 23 API endpoints with persistent request counters
  - INTEGRATED backend middleware to track API usage automatically on each request
  - ADDED comprehensive API name mapping and descriptions for all endpoints
  - IMPLEMENTED intelligent ranking system that updates Top 5 APIs dynamically
  - CREATED visual feedback system with purple gradient ripples on page interactions
  - ADDED smooth animations for request count changes with green highlight effects
  - POSITIONED Top 5 APIs section prominently under dashboard stats as requested
  - ENHANCED user experience with real-time insights into API popularity and usage
  - All 23 APIs now tracked: YouTube Search, TikTok Downloader, Spotify variants, AI models, Anime/Manga APIs, and utility endpoints
  - System automatically increments counters when users interact with any API endpoint
  - Live dashboard updates maintain accurate popularity rankings without page refresh

- June 27, 2025: Top 5 APIs section added and placeholder image removed
  - ADDED "Top 5 APIs" section to /docs page matching reference design
  - Created visually appealing ranking display with numbered circular badges
  - Implemented gradient ranking badges (gold #1, silver #2, bronze #3, gray #4-5)
  - Added all visual effects: sparkle, glow, magnetic hover, ripple effects
  - Included request count statistics for each API endpoint
  - Featured most popular APIs: YouTube Search, TikTok Downloader, Spotify Downloader, AI Jamba Large, Anime Search
  - Applied consistent styling with existing dashboard cards
  - REMOVED placeholder image from docs page header section
  - Enhanced user experience with interactive API popularity insights
  - Section includes rotating borders, breathing animations, and sparkle effects
  - Each API item has magnetic button effects and hover transformations

- June 27, 2025: Universal touch/click ripple effect system implementation
  - CREATED comprehensive ripple effect system across entire project
  - Built universal ripple-effects.js for consistent touch/click animations
  - Developed ripple-styles.css with multiple color variants (purple, pink, blue, green, teal, amber, red, orange)
  - Implemented intelligent color selection based on element context and classes
  - ENHANCED all pages with interactive ripple effects: /, /docs, /portal
  - Added ripple effects to all buttons, links, cards, and interactive elements
  - Created smart color mapping: gradient buttons (pink), dark elements (blue), status indicators (contextual colors)
  - Included accessibility features: reduced motion support, high contrast mode
  - Added hover enhancement effects with subtle scaling and animations
  - Implemented responsive design considerations for mobile devices
  - System automatically detects and applies appropriate ripple colors
  - Prevents duplicate event listeners and handles dynamic content
  - All interactive elements now provide consistent visual feedback across platform

- June 27, 2025: Enhanced visual effects and removed online status from /docs page
  - ADDED extensive visual effects to /docs page including floating background shapes
  - Implemented neon glow effects, sparkle animations, and breathing card animations
  - Added magnetic button effects with hover transformations and ripple effects
  - Created rotating border animations and parallax mouse movement effects
  - Enhanced dashboard cards with breathing animations, sparkle effects, and magnetic buttons
  - Added interactive sparkle particle system that triggers on clicks
  - Implemented enhanced scroll animations with staggered entrance effects
  - REMOVED "online" status indicator from /docs page header completely
  - Eliminated status dot and status text display from main dashboard header
  - Enhanced time widget with rotating borders, breathing animation, and sparkle effects
  - Added floating shapes in background with smooth parallax movement
  - All effects optimized for performance using CSS transforms and hardware acceleration

- June 27, 2025: Home page scrolling fix and endpoint count removal
  - FIXED scrolling issue on home page (/) by adding overflow-y-auto to body element
  - REMOVED entire API stats section displaying endpoint counts from home page
  - Eliminated "Total APIs", "Categories", and "Available" cards from home page display
  - Cleaned up JavaScript code that loaded API statistics (loadApiStats function)
  - Removed API count fetch request (/api/info?key=sexy) from page initialization
  - Home page now has cleaner, simpler layout focused on navigation to documentation
  - Page scrolling now works properly on all devices and screen sizes

- June 27, 2025: Dynamic visual effects and animations enhancement
  - ENHANCED home page (/) with floating background shapes and particle animations
  - Added gradient shifting backgrounds with animated color transitions
  - Implemented floating profile image with glow effects and pulsing animations
  - Created interactive card hover effects with sweep animations and scale transforms
  - Added sparkle animations to icons and gradient text animations
  - Enhanced API stats cards with individual animation delays and hover transformations
  - Implemented parallax mouse movement effects for floating shapes
  - Added click ripple effects for interactive elements with expanding circles
  - Created entrance animations on scroll using Intersection Observer API
  - ENHANCED docs page (/docs) with comprehensive animation system
  - Added pulse-glow animations to header elements and navigation
  - Implemented sliding entrance animations with staggered delays for content
  - Enhanced dashboard cards with dynamic hover effects and shimmer animations
  - Added floating elements with continuous gentle movement animations
  - Created glow effects for text elements, borders, and interactive components
  - Implemented bounce-gentle animations for icons and status indicators
  - Added gradient text animations with shifting color backgrounds
  - Enhanced notification and UI elements with interactive button effects
  - Both pages now feature modern, fluid animations that enhance user experience
  - All effects optimized for performance using hardware acceleration and CSS transforms

- June 27, 2025: Portal removal and profile cleanup
  - REMOVED /portal route from server configuration (index.js)
  - Deleted portal navigation link from home page (index.html) 
  - Removed profile picture and profile logo elements from docs page header
  - Eliminated profile dropdown menu and associated JavaScript functions
  - Cleaned up profile-related event listeners and UI components
  - Removed loadUserProfile() function and profile avatar references
  - Platform now fully streamlined without profile/portal functionality
  - All 23 APIs remain fully accessible with cleaner, simplified interface

- June 27, 2025: Complete authentication removal and open API platform
  - REMOVED all sign-in and sign-up authentication logic from entire application
  - Eliminated session token authentication system and user management
  - Removed login/logout functionality and user credential checking
  - Removed authentication middleware and protected route restrictions
  - Deleted authentication-related API endpoints (/api/login, /api/logout, /api/check-username, /api/signup-request)
  - Removed user data files (userdata.json, signup-requests.json) and WhatsApp signup system
  - Cleaned up authentication code from frontend (docs.html, portal.html, index.html)
  - Removed login.html page and converted to direct access welcome page
  - Updated index.html to serve as open welcome page with direct API documentation access
  - Converted all protected routes to open access (/, /docs, /portal)
  - Updated docs.html to remove user profile authentication checks and logout functionality
  - Simplified portal.html by removing session token verification and authentication checks
  - Fixed authentication API in example folder to become proper POST test endpoint
  - Root route (/) now directly serves API documentation instead of login page
  - All 23 APIs now publicly accessible without any authentication requirements
  - Platform converted to completely open API access for all users
  - Server startup logs simplified to show documentation URL instead of login credentials
  - Enhanced user experience with immediate access to all API functionality

- June 26, 2025: API display fix, WhatsApp signup system, Terabox API, and authentication
  - PERMANENTLY FIXED API display on /docs page with multiple fallback methods
  - Implemented robust API loading system that never fails to display APIs
  - All APIs display correctly with categories: downloader, anime, AI, utility, example
  - Added new Terabox Video Streaming API (/api/teraboxdl) for direct video playback
  - Total API routes: 23 with guaranteed display on docs page

- June 25, 2025: React.js removal and time/date widget implementation
  - Removed React.js dependencies and code from the entire application
  - Created new live time and date widget with seconds display on /docs page
  - Removed Live API Usage widget from /docs page per user request
  - Improved performance by eliminating React.js overhead and dependencies
  - Maintained clean, minimal interface with only essential widgets
  - Updated all branding from AjiroDesu/Wataru API to Xrotick API throughout project
  - Added dynamic visual effects: glow animations, floating elements, slide-in transitions
  - Enhanced login page with animated glass cards and pulsing borders
  - Improved dashboard with bouncing animations and glowing Xrotick branding
  - Updated API author credits from AjiroDesu to Xrotick in all modules
  - Premium widget styling: shimmer effects, pulse glows, category indicators, custom scrollbars
  - Enhanced glass card design with improved backdrop blur and gradient borders
  - Secured /api/info endpoint requiring key parameter (?key=sexy) for access protection
  - Fixed server startup issues ensuring stable application execution
  - Tracks all 23 APIs across categories with immediate updates
  - All APIs remain fully functional without authentication requirements

## User Preferences

Preferred communication style: Simple, everyday language.
Preview display: User wants to see the application running in Replit preview interface.
Authentication: User requested removal of ALL sign-in and sign-up authentication logic from the web app.
UI preferences: Clean interface with open access to documentation without authentication barriers.
Platform access: Open API platform where all endpoints are publicly accessible without login requirements.