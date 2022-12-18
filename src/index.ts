class ObjectWrapper {
  private object: any
  constructor(object: any) {
    this.object = object
  }

  setPropVal(property: string, value: any, needOldValue?: boolean) {
    const _oldVal = this.access(this.propSplit(property), this.object, value)
    if (needOldValue === true)
      return _oldVal
  }

  getPropVal(property: string) {
    return this.access(this.propSplit(property), this.object, undefined)
  }

  private access(propStairs: string[], reference: any, value?: any): any {
    const propInfo = this.propAnalyze(propStairs.shift()!)
    const _reference = (propInfo.idx === undefined)
      ? reference[propInfo.key]
      : reference[propInfo.key][propInfo.idx]

    if (propStairs.length === 0) {
      if (value !== undefined) {
        if (propInfo.idx === undefined)
          reference[propInfo.key] = value
        else
          reference[propInfo.key][propInfo.idx] = value
      }
      return _reference
    }

    return this.access(propStairs, _reference, value)
  }

  private propSplit(property: string) {
    return property.split('.')
  }

  private propAnalyze(property: string) {
    const info = {
      key: property,
      idx: undefined as unknown as string,
    }
    const lBracketPos = property.indexOf('[')
    if (lBracketPos === -1)
      return info

    const rBracketPos = property.indexOf(']')
    info.idx = property.substring(lBracketPos + 1, rBracketPos)
    info.key = property.substring(0, lBracketPos)
    return info
  }
}
export {
  ObjectWrapper as default,
}
