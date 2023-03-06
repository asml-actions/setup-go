# ASML Setup Go
A GitHub Action to setup your workflow to use a specific version of Go fetched from [Artifactory](https://artifactory-de.asml.com/ui/repos/tree/General/rise-generic-dev-local/toolchain-cache).

# Usage
See [action.yml](action.yml)
This action needs an Artifactory token to be used with runners that are not deployed on k8s to download tools from Artifactory. For the k8s runners there is no need to provide token.
If you do not have the token, contact the RISE team. 

Basic:
```yaml
    steps:
    - uses: actions/setup-go@main
      with:
        go-version: '1.20.x' # The Go version to download (if necessary) and use.
      env:
        ARTIFACTORY_TOKEN: ${{secrets.SETUP_ACTION_ARTIFACTORY_DE_TOKEN}}
    - run: go run hello.go
```

Matrix Testing:
```yaml
jobs:
  build:
    runs-on: asml-gh-org
    strategy:
      matrix:
        go: [ '1.14.x', '1.15.x', '1.16.x', '1.17.x','1.20.x' ]
    name: Go ${{ matrix.go }} sample
    steps:
      - name: Setup go
        uses: actions/setup-go@main
        with:
          go-version: ${{ matrix.go }}
        env:
          ARTIFACTORY_TOKEN: ${{secrets.SETUP_ACTION_ARTIFACTORY_DE_TOKEN}}
      - run: go run hello.go
```
