import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { MockPipe } from '../src/pipe';

@Pipe({ name: 'empty' })
class EmptyPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return value;
    }
}

@Pipe({ name: 's-pipe' })
class SPipe implements PipeTransform {
    constructor(private service: DummyService) {
    }

    transform(value: any, ...args: any[]): any {
        return value;
    }
}

@Injectable()
class DummyService {
}

describe('Mocking a Pipe', () => {

    it('should mock EmptyPipe', () => {
        const mockedPipe = MockPipe(EmptyPipe);
        const annotations = Reflect.getMetadata('annotations', mockedPipe);
        expect(annotations[0].name).toBe('empty');
        expect(mockedPipe.prototype['transform']).toBeTruthy();
    });

    it('should mock SPipe', () => {
        const mockedPipe = MockPipe(SPipe);
        const annotations = Reflect.getMetadata('annotations', mockedPipe);
        expect(annotations[0].name).toBe('s-pipe');
        expect(mockedPipe.prototype['transform']).toBeTruthy();
        // TODO check constructor parameters
    });
});
