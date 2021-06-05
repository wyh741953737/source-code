import React from 'react';
import platformMatch from '@/utils/platformMatch';
import WebComponent from './web';
import MobileComponent from './_mobile';

const Page = platformMatch(WebComponent, MobileComponent);

export default (props: any) => <Page {...props} />;
