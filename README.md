### paika.tech Blog
This is the repository for [paika.tech](https://paika.tech).  It's a static site, using [Jekyll](https://jekyllrb.com/) and hosted on Github Pages.

### Local Development
To avoid Ruby toolchain issues, I've wrapped Jekyll in a docker-compose file for local development:
1.  Install docker-compose.  On Mac or Linux, you can use [Homebrew](https://brew.sh/):
```bash
brew install docker
```
2.  Run `docker-compose up`
3.  Navigate to `localhost:4000/` to see the blog

Live reload is enabled, as you edit files your browser will reload the changes.

