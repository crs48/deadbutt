import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
const mascot = (await readFile('public/favicon.svg', 'utf8')).replace(
  '<svg ',
  '<svg x="820" y="155" width="300" height="300" ',
);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f8f5ed"/><path d="M55 90h1090M55 548h1090" stroke="#cbd0bf"/><text x="60" y="62" fill="#283a30" font-family="Arial" font-size="28" font-weight="bold">deadbutt.fyi</text><text x="60" y="155" fill="#a6472d" font-family="Arial" font-size="15" letter-spacing="3">A FIELD GUIDE FOR YOUR BEHIND</text><g fill="#283a30" font-family="Arial" font-weight="bold" font-size="79" letter-spacing="-4"><text x="55" y="255">Your butt called.</text><text x="55" y="345">It wants its</text></g><text x="55" y="439" fill="#a6472d" font-family="Georgia" font-style="italic" font-size="88" letter-spacing="-4">job back.</text><text x="60" y="504" fill="#596358" font-family="Arial" font-size="23">Small moves. No shame. A few butt jokes.</text>${mascot}<text x="60" y="590" fill="#596358" font-family="Arial" font-size="18">A friendly exploration of gluteal amnesia, strength, and feeling connected.</text></svg>`;
await writeFile('public/social.png', await sharp(Buffer.from(svg)).png().toBuffer());
