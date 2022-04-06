function getTitle(id: string) {
  const map: Record<string, string> = {
    cryptopunks: 'Cryptopunks',
    meebits: 'Meebits',
    'pudgy-penguins': 'Pudgy Penguins',
    'the-wanderers': 'The Wanderers',
    artblocks: 'Artblocks',
    'the-sandbox': 'The Sandbox',
    cryptoadz: 'Cryptoadz',
    'cryptodickbutts-s3': 'Cryptodickbutts S3',
  };
  return map[id];
}

function getIcon(id: string) {
  const map: Record<string, string> = {
    cryptopunks:
      'https://lh3.googleusercontent.com/8hw6aLyCAtEWNsCmlzpG-HRmwvBQvlGTskUL4i_Wjoa2vg3F6cfL5s_ZIRZ7YlIwlWcdHyFwMOW1QtrtRfgCtICHHDLn5KOFlfVT',
    meebits:
      'https://lh3.googleusercontent.com/XbdtZ8LLreloXu4JVEVdjH8Z_rr6BaeYua3weti6fHAJp8TgoepcOAPsqrGTtrczUrlGQbXDI0E1yuadCAEHzsl5t06R685GggtUFQ',
    'pudgy-penguins':
      'https://lh3.googleusercontent.com/2Kwanhi0zPRu9I9mjcb6Vxin_cTVGTSULCJn1K-rGCr6tTfKPgqdBzH3e_0FV3Ho6udJqM6iwRitpU7pglaPyIi-gNSsiJHaVIWdAEI',

    'the-wanderers':
      'https://lh3.googleusercontent.com/eb4sx9jFK9EXFjdU5JzwesKvK8wNxHC1hRn5OZ-a08X-U6pglqGHvzlqPDlzTepp7DiBURY-gIfVkNNHjBukKpWO3LNf8lFe62fiLvg=s120',
    artblocks:
      'https://lh3.googleusercontent.com/vPVBU0PnsF-IEUul39LDS_gjwMyo3EqGo_KRYBWK73c0RF4WYduNuCXVSnOncyErOKwB8xeRLpjI3jSt4KXzbvXq30kmqEEndQNsTQ',
    'the-sandbox':
      'https://lh3.googleusercontent.com/7TZ2KsWdSW-7-l2mlzqSxY-7wPuCw6EBrpaypE89dA806f13QPZenIYmIOHgJ88Oh37WDR2XBeBpHtohtq5cNopTejQQamOeSure',
    cryptoadz:
      'https://ipfs.io/ipfs/QmcrUfMWu9g8RuVA5V5ZtWv6Daor6SCR78mtumckTM3eYz',
    'cryptodickbutts-s3':
      'https://lh3.googleusercontent.com/jBwHuLA2rkrlSuNXB7QrQ5AnSZo1B8WyTq-3G82UOC3-XkWY5BDRbO1p2w3o3cKaW7OTQ0Qd2U4WKr6ux0CyJa43ccbfEU799kpFag',
  };
  return map[id];
}

export { getTitle, getIcon };
