# ASML Setup Go
A GitHub Action to setup your workflow to use a specific version of Go fetched from [Artifactory](https://artifactory-de.asml.com/ui/repos/tree/General/rise-generic-dev-local/toolchain-cache).

# Usage
See [action.yml](action.yml)
You need to use the global Artifactory token to be able to download the binaries from Artifactory. If you do not have it, contact the RISE team.

Basic:
```yaml
    steps:
    - uses: actions/asml-setup-go@main
      with:
        go-version: '1.14.x' # The Go version to download (if necessary) and use.
      env:
        ARTIFACTORY_TOKEN: ${{secrets.ARTIFACTORY_TOKEN}}
    - run: go run hello.go
```

Matrix Testing:
```yaml
jobs:
  build:
    runs-on: asml-gh-org
    strategy:
      matrix:
        go: [ '1.14.x', '1.15.x', '1.16.x', '1.17.x' ]
    name: Go ${{ matrix.go }} sample
    steps:
      - name: Setup go
        uses: actions/asml-setup-setup-go@main
        with:
          go-version: ${{ matrix.go }}
        env:
          ARTIFACTORY_TOKEN: ${{secrets.ARTIFACTORY_TOKEN}}
      - run: go run hello.go
```
