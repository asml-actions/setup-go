# ASML Setup Go

A GitHub Action to setup your workflow to use a specific version of Go fetched from [Artifactory](https://artifactory-de.asml.com/ui/repos/tree/General/rise-generic-dev-local/toolchain-cache).
# Usage

See [action.yml](action.yml)

Basic:
```yaml
steps:
- uses: actions/asml-setup-go@main
  with:
    go-version: '1.14.x' # The Go version to download (if necessary) and use.
- run: go run hello.go
```

Matrix Testing:
```yaml
jobs:
  build:
    runs-on: ubuntu-16.04
    strategy:
      matrix:
        go: [ '1.14.x', '1.15.x', '1.16.x', '1.17.x' ]
    name: Go ${{ matrix.go }} sample
    steps:
      - name: Setup go
        uses: actions/asml-setup-setup-go@main
        with:
          go-version: ${{ matrix.go }}
      - run: go run hello.go
```
