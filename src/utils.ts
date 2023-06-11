export const getTime = (isoStr: string) => new Date(isoStr).toLocaleTimeString('en-US', { hour: 'numeric', 'minute': '2-digit' });
export const checkCode = (code: string) => code.match(/^[A-Z]{3}$/);
export const airportSearch = async (query: string) => fetch(`https://www.momondo.com/mvm/smartyv2/search?s=airportonly&where=${query}`, { method: 'POST' }).then(res => res.json())