export async function writeClipboard(
  text: string,
  clipboard: Pick<Clipboard, 'writeText'>,
): Promise<void> {
  await clipboard.writeText(text);
}
