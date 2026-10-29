/**
 * The page shell: one frame (rail, column, footer slot), three header variants. Sized from
 * `../kit/scale.ts`, coloured through the kit's skin. No `@/` imports, so it can be lifted with
 * the kit into a shared package.
 */
export { Shell, type ShellNav } from './shell';
export { Header, HEADER_WIDTH, type HeaderProps, type HeaderVariant, type HeaderAction } from './header';
export { Rail, Drawer, type RailGroup, type RailItem } from './rail';
export { Footer, type FooterLink } from './footer';
export { DocSection, DocText, DOC_MEASURE } from './doc';
