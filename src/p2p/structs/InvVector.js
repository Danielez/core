class InvVector {
    static async fromBlock(block) {
        const hash = await block.hash();
        return new InvVector(InvVector.Type.BLOCK, hash);
    }

    static async fromTransaction(tx) {
        const hash = await tx.hash();
        return new InvVector(InvVector.Type.TRANSACTION, hash);
    }

    constructor(type, hash) {
        this._type = type;
        this._hash = hash;
    }

    static unserialize(buf) {
        let type = buf.readUInt32();
        let hash = Hash.unserialize(buf);
        return new InvVector(type, hash);
    }

    serialize(buf) {
        buf = buf || new Buffer(this.serializedSize);
        buf.writeUint32(this._type);
        this._hash.serialize(buf);
        return buf;
    }

    get serializedSize() {
        return /*invType*/ 4
            + this._invHash.serializedSize;
    }

    get type() {
        return this._type;
    }

    get hash() {
        return this._hash;
    }
}
InvVector.Type = {
    ERROR: 0,
    TRANSACTION: 1,
    BLOCK: 2
}