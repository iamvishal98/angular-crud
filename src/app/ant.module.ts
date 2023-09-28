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
        NzGridModule
    ]
})
export class AntdModule {}
