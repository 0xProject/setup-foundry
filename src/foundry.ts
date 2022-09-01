import * as filepath from 'path';
import * as core from '@actions/core';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';
import * as exec from '@actions/exec';

const FOUNDRY_ROOTDIR = '.foundry';
const FOUNDRY_DIRECTORIES = ['bin', 'man', 'share'];

function getHomeDirectory(): string {
  return process.env.HOME !== undefined ? process.env.HOME : '/';
}

function setupDirectories(): void {
  const home = getHomeDirectory();

  FOUNDRY_DIRECTORIES.forEach(directory => {
    const fullpath = filepath.join(home, FOUNDRY_ROOTDIR, directory);

    io.mkdirP(fullpath);
  });
}

const FOUNDRYUP_URL =
  'https://raw.githubusercontent.com/foundry-rs/foundry/master/foundryup/foundryup';

async function download(): Promise<string> {
  const foundryup = await tc.downloadTool(FOUNDRYUP_URL);
  await exec.exec(`chmod +x ${foundryup}`);

  return foundryup;
}

export interface Options {
  version: string;
}

export async function install(options: Options): Promise<number> {
  setupDirectories();

  const foundryup = await download();
  const bindir = filepath.join(getHomeDirectory(), FOUNDRY_ROOTDIR, 'bin');

  core.addPath(bindir);

  const args = ['--repo', 'foundry-rs/foundry', '--version', options.version];

  return exec.exec(foundryup, args);
}
