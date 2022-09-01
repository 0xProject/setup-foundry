# setup-foundry

Install [foundry-rs/foundry](https://github.com/foundry-rs/foundry).

## Example

```yaml
name: Setup foundry

on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: 0xProject/setup-foundry@master

```