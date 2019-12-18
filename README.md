# download-repo-action

[![Actions Status](https://github.com/SkySoft-ATM/download-repo-action/workflows/snapshot/badge.svg)](https://github.com/SkySoft-ATM/download-repo-action/actions)

[![Actions Status](https://github.com/SkySoft-ATM/download-repo-action/workflows/release/badge.svg)](https://github.com/SkySoft-ATM/download-repo-action/actions)

This action makes it easy to quickly download a github repository in your workflow 
using the GitHub API.

In order to use this action, a set of elements need to be provided. 

**Note** This action is still "Release Candidate" and the API may change in
future versions. 🙂

## Examples

### Download a repository as (zip) archive file

```yaml
on: [push]

jobs:
  retrieve:
    runs-on: ubuntu-latest
    steps:
      - uses: SkySoft-ATM/download-repo-action@master
        with:
          github-token: ${{secrets.GITHUB_TOKEN}}
          owner: "SkySoft-ATM"
          repo: "my-repo"
          branch: "master"
          dir: "./"          
```
