export class KeyValuePair<TKey, TValue> {
    public constructor(key: TKey, value: TValue) {
        this.key = key;
        this.value = value;
    }

    public key: TKey = {} as TKey;
    public value: TValue = {} as TValue;
}