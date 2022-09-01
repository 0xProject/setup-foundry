import * as foundry from './foundry';
import * as core from '@actions/core';

export async function run() {
  const options: foundry.Options = {
    version: core.getInput('version')
  };

  await foundry.install(options);
}
