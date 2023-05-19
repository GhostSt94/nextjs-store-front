const CURRENCY = 'USD'
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, { currency: CURRENCY, style: 'currency' })

const formatCurrency = (number: number) => CURRENCY_FORMATTER.format(number)


export {formatCurrency}