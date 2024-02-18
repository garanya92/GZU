import { Pipe, PipeTransform } from '@angular/core';
import { AdaptiveService } from '../services/adaptive.service';

@Pipe({
  name: 'cutString',
  standalone: true
})
export class CutStringPipe implements PipeTransform {



  transform(text: String, length: number): String{

    if (text.length > length  )
    {
      text = text.substring(0, length)
      text =  text + "..."

    }



return text;
}

}
