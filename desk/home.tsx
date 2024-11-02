import {HomeIcon} from '@sanity/icons'
import {ListItemBuilder} from 'sanity/structure'

import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Home')
    .id('home')
    .icon(HomeIcon)
    .child(
      S.list()
        .title('Home')
        .id('home')
        .items([S.documentListItem().schemaType('home').icon(HomeIcon).id('home').title('Home')])
        .canHandleIntent((intentName, params) => intentName === 'edit' && params.id === 'home'),
    ),
)
