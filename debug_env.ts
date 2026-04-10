import 'dotenv/config';
console.log('--- Environment Debug ---');
console.log('DEEPSEEK_API_KEY exists:', !!process.env.DEEPSEEK_API_KEY);
if (process.env.DEEPSEEK_API_KEY) {
  console.log('Key prefix:', process.env.DEEPSEEK_API_KEY.substring(0, 5));
}
console.log('-------------------------');
