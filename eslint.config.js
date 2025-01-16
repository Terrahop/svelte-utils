import config from '@terrahop/eslint-config-svelte'

export default [
  ...config,
  {
    rules: {
      'eslint-comments/require-description': 'off',
      'eslint-comments/disable-enable-pair': 'off'
    }
  },
	{
    ignores: ['build/', '.svelte-kit/', 'dist/']
  }
]
