import { Data } from '../../shared';
import { updatePage } from './controller';

declare global { const DATA: Data }

updatePage({ initial: true })