export const formatter = new Intl.NumberFormat("ru", {
	style: `currency`,
	currency: `RUB`,
	maximumFractionDigits: 0,
});

export const DOMAIN = process.env.NODE_ENV === `production` ? `jourloy.com` : `jourloy.online`;
