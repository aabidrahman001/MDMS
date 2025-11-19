export const environment = {
  production: true,
  GATEWAY : '${{ secrets.GATEWAY_API}}',
  HES : '${{ secrets.HES_API}}',
  TELEMETRY : '${{ secrets.TELEMETRY_API}}',
  COMMAND : '${{ secrets.COMMAND_API}}',
  TENANT_ID: '${{ secrets.TENANT}}',
  TOKEN: "${{ secrets.TOKEN}}"
};

