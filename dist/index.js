/**
 * tcgscan-ui: the page shell and control kit both TCGScan apps consume.
 *
 *   kit    controls on one size scale (36 / 44 / 52, rows 48, sheets 56 + 72), skinned per app
 *          through KitProvider: colours from the app's tcgscan-theme palette, radius per role,
 *          the display face and the one primary shadow.
 *   shell  the page frame: rail (desktop) or drawer (phone), back row, the doc / hero /
 *          workbench headers, the column at 800 / 960 / 1440, and the footer slot.
 *
 * Import-free of any app: everything app-specific (routes, nav groups, the brand mark, the face
 * loader) comes in through props and KitProvider.
 */
export * from './kit';
export * from './shell';
