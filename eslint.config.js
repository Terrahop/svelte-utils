import config from '@terrahop/eslint-config-svelte'

export default [
  ...config,
  {
    rules: {
      'eslint-comments/require-description': 'off',
      'eslint-comments/disable-enable-pair': 'off',
      'unicorn/no-abusive-eslint-disable': 'off'
    }
  },
	{
    ignores: ['build/', '.svelte-kit/', 'dist/']
  }
]
