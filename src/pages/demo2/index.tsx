import React from 'react';
import platformMatch from '@/utils/platformMatch';
import WebComponent from '../StationSearchPage/_web';
import MobileComponent from '../StationSearchPage/_mobile';

const Page = platformMatch(WebComponent, MobileComponent);

export default (props: any) => <Page {...props} />;
