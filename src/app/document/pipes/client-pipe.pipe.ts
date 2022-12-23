import {Pipe, PipeTransform} from '@angular/core';
import {Client} from "../../entities/Client";

@Pipe({
  name: 'clientPipe'
})
export class ClientPipePipe implements PipeTransform {

  transform(value: number, clients: Client[]): string | undefined {
    return clients?.find(client => client.id == value)?.firstName;
  }
}
