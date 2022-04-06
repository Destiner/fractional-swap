function getTitle(id: string) {
  const map: Record<string, string> = {
    cryptopunks: 'Cryptopunks',
    meebits: 'Meebits',
    'pudgy-penguins': 'Pudgy Penguins',
  };
  return map[id];
}

function getIcon(id: string) {
  const map: Record<string, string> = {
    cryptopunks: 'https://lh3.googleusercontent.com/8hw6aLyCAtEWNsCmlzpG-HRmwvBQvlGTskUL4i_Wjoa2vg3F6cfL5s_ZIRZ7YlIwlWcdHyFwMOW1QtrtRfgCtICHHDLn5KOFlfVT',
    meebits: 'https://lh3.googleusercontent.com/XbdtZ8LLreloXu4JVEVdjH8Z_rr6BaeYua3weti6fHAJp8TgoepcOAPsqrGTtrczUrlGQbXDI0E1yuadCAEHzsl5t06R685GggtUFQ',
    'pudgy-penguins': 'https://lh3.googleusercontent.com/2Kwanhi0zPRu9I9mjcb6Vxin_cTVGTSULCJn1K-rGCr6tTfKPgqdBzH3e_0FV3Ho6udJqM6iwRitpU7pglaPyIi-gNSsiJHaVIWdAEI',
  };
  return map[id];
}

export {
  getTitle,
  getIcon,
};
