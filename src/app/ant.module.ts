import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconDefinition } from "@ant-design/icons-angular";
import {
  LockOutline,
  UserOutline
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
    UserOutline,
    LockOutline
  ];

@NgModule({
    exports : [
        NzTableModule,
        NzButtonModule,
        NzTypographyModule,
        NzDividerModule,
        NzFormModule,
        NzModalModule,
        NzInputModule,
        NzPopoverModule,
        NzSpinModule,
        NzMessageModule,
        NzPopconfirmModule,
        NzDescriptionsModule,
        NzGridModule,
        NzIconModule,
        NzToolTipModule,
        NzTabsModule,
        NzResultModule,
        NzCardModule,
        NzSelectModule,
        NzDropDownModule
    ],

    imports:[
        NzIconModule.forChild(icons)
    ]
})
export class AntdModule {}
