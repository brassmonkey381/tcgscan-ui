/**
 * The page shell: one frame (rail, column, footer slot), three header variants. Sized from
 * `../kit/scale.ts`, coloured through the kit's skin. No `@/` imports, so it can be lifted with
 * the kit into a shared package.
 */
export { Shell } from './shell';
export { Header, HEADER_WIDTH } from './header';
export { Rail, Drawer } from './rail';
export { Footer } from './footer';
export { DocSection, DocText, DOC_MEASURE } from './doc';
