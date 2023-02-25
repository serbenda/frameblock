const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'XXXXXXXXXXXXXXXXXXXXXXXXX'
  : 'XXXXXXXXXXXXXXXXXXXXXXXXX';
### strike key code
export default STRIPE_PUBLISHABLE;
