import getUsername from "./getUsername"
import getNumber from "./getNumber"

const normalize = url => {
  return url.match(/http/) ? url : `http://${url}`
} 

export default ({name, code, urlType}) => {
  switch (name) {
    // Other
    case "email": {
      return {url: `mailto:${code}`, text: code}
    }

    case "phone": {
      return {url: `tel:${code}`, text: code}
    }

    case "nbutton": {
      const [text, url] = code.split("@")
      
      return {
        url: normalize(url), 
        text
      }
    }

    // Social networks
    case "instagram": {
      const url = urlType == "application"
        ? "instagram://user?username="
        : "https://instagram.com/"
        
      const username = getUsername("instagram", code)
        .replace(/@*/, "")

      return {
        url: url + username,
        text: username
      }
    }

    case "facebook": {
      const url = "https://facebook.com/"
      const username = getUsername("facebook", code, "id")
        .replace(/@*/, "")
      
      return {
        url: url + username,
        text: username
      }
    }

    case "ask": {
      const url = "https://ask.fm/"
      const username = getUsername("ask", code)
        .replace(/@*/, "")
      
      return {
        url: url + username,
        text: username
      }
    }

    case "vkontakte": {
      const url = "https://vk.me/"
      const username = getUsername("vk", code)
        .replace(/@*/, "")
      
      return {
        url: url + username,
        text: username
      }
    }

    case "ok": {
      const url = "https://ok.ru/"
      const username = getUsername("ok", code)
        .replace(/@*/, "")
      
      return {
        url: url + username,
        text: username
      }
    }

    case "twitter": {
      const url = "https://twitter.com/"
      const username = getUsername("twitter", code)
        .replace(/@*/, "@")
      
      return {
        url: url + username,
        text: username
      }
    }

    case "snapchat": {
      const url = "https://www.snapchat.com/add/"
      const username = getUsername("snapchat", code)
        .replace(/@*/, "")
      
      return {
        url: url + username,
        text: username
      }
    }

    case "linkedin": {
      const url = "https://www.linkedin.com/in/"
      const username = getUsername("linkedin", code)
        .replace(/@*/, "")
      
      return {
        url: url + username,
        text: username
      }
    }

    case "reddit": {
      const url = "https://www.reddit.com/user/"
      const username = getUsername("reddit", code)
        .replace(/@*/, "")
      
      return {
        url: url + username,
        text: username
      }
    }

    case "googleplus": {
      const url = "https://plus.google.com/"
      const username = getUsername("googleplus", code)
        .replace(/\+*/, "+")
      
      return {
        url: url + username,
        text: username
      }
    }

    case "medium": {
      const url = "https://medium.com/"
      const username = getUsername("medium", code)
        .replace(/@*/, "@")
      
      return {
        url: url + username,
        text: username
      }
    }

    case "periscope": {
      const url = "https://www.pscp.tv/"
      const username = getUsername("periscope", code)
        .replace(/@*/, "")
      
      return {
        url: url + username,
        text: username
      }
    }

    // Messengers
    case "whatsapp": {
      const url = "https://api.whatsapp.com/send?phone="
      const number = getNumber(code)

      return {
        url: url + number,
        text: code
      }
    }

    case "viber": {
      const url = "viber://chat?number="
      const number = getNumber(code)

      return {
        url: url + number,
        text: code
      }
    }

    case "skype": {
      const url = `skype:${code}?chat`

      return {
        url: url,
        text: code
      }
    }

    case "messenger": {
      const url = "https://m.me/"

      return {
        url: url + code.replace(/@*/, ""),
        text: code
      }
    }

    case "telegram": {
      const url = "https://t.me/"

      return {
        url: url + code.replace(/@*/, ""),
        text: code
      }
    }

    // Design & portfolio
    case "dribbble": {
      const url = "https://dribbble.com/"
      const username = getUsername("dribbble", code)
        .replace(/@*/, "")

      return {
        url: url + username,
        text: username
      }
    }

    case "behance": {
      const url = "https://www.behance.net/"
      const username = getUsername("behance", code)
        .replace(/@*/, "")

      return {
        url: url + username,
        text: username
      }
    }

    case "pinterest": {
      const url = "https://pinterest.com/"
      const username = getUsername("pinterest", code)
        .replace(/@*/, "")

      return {
        url: url + username,
        text: username
      }
    }

    // Development & freelance
    case "github": {
      const url = "https://github.com/"
      const username = getUsername("github", code)
        .replace(/@*/, "")

      return {
        url: url + username,
        text: username
      }
    }

    case "stackoverflow": {
      return {
        url: normalize(code),
        text: getUsername("stackoverflow", code)
      }
    }

    case "upwork": {
      return {
        url: normalize(code),
        text: getUsername("upwork", code)
      }
    }

    // Wallet
    case "bitcoin": {
      const url = "https://blockchain.info/address/"
      const username = getUsername("bitcoin", code)

      return {
        url: url + username,
        text: username
      }
    }

    case "paypal": {
      const url = "https://paypal.me/"
      const username = getUsername("paypal", code)

      return {
        url: url + username,
        text: username
      }
    }

    // Audio & Video
    case "youtube": {
      const url = "https://www.youtube.com/user/"
      const username = getUsername("youtube", code)
        .replace(/@*/, "")

      return {
        url: url + username,
        text: username
      }
    }

    case "twitch": {
      const url = "https://go.twitch.tv/"
      const username = getUsername("twitch", code)
        .replace(/@*/, "")

      return {
        url: url + username,
        text: username
      }
    }

    case "soundcloud": {
      const url = "https://soundcloud.com/"
      const username = getUsername("soundcloud", code)
        .replace(/@*/, "")

      return {
        url: url + username,
        text: username
      }
    }

    case "flickr": {
      const url = "https://www.flickr.com/photos/"
      const username = getUsername("flickr", code)
        .replace(/@*/, "")

      return {
        url: url + username,
        text: username
      }
    }

    case "spotify": {
      const url = "https://open.spotify.com/user/"
      const username = getUsername("spotify", code)
        .replace(/@*/, "")

      return {
        url: url + username,
        text: username
      }
    }

    // Blog
    case "tumblr": {
      const url = ".tumblr.com"
      const username = getUsername("tumblr", code)
        .replace(/@*/, "")
      
      return {
        url: normalize(username + url),
        text: username
      }
    }

    case "weibo": {
      const url = "https://weibo.com/"
      const username = getUsername("weibo", code)
        .replace(/@*/, "")
      
      return {
        url: url + username,
        text: username
      }
    }

    // Default
    default:
      return {url: normalize(code)}
  }
}