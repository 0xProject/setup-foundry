import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as exec from '@actions/exec';

export async function run() {
  const cache = core.getInput('cache');

  if (cache) {
    core.info('cache enabled');
  } else {
    core.info('cache disabled');
  }

  const foundryup = await tc.downloadTool(
    'https://github.com/foundry-rs/foundry/blob/master/foundryup/foundryup'
  );

  await exec.exec('chmod +x foundryup');

  core.info('Running foundryup');

  await exec.exec('./foundryup');
}
