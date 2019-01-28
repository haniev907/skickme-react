export default type => {
  switch (type) {
    case "instagram":
      const {url, id, redirectUri} = __CONFIG__.oAuth.instagram

      return `${url}?client_id=${id}&redirect_uri=${redirectUri}&response_type=code`
  }
}