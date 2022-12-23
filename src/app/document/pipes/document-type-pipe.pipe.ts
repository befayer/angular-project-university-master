import {Pipe, PipeTransform} from '@angular/core';
import {Client} from "../../entities/Client";
import {DocumentType} from "../../entities/DocumentType";

@Pipe({
  name: 'documentTypePipe'
})
export class DocumentTypePipe implements PipeTransform {

  transform(value: number, documentTypes: DocumentType[]): string | undefined {
    return documentTypes?.find(documentType => documentType.id == value)?.documentTypeName;
  }
}
