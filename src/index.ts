export class ObjectWrapper {
  private object: any
  constructor(object: any) {
    this.object = object
  }

  setPropVal(property: string, value: any, needOldValue?: boolean) {
    if (property === undefined) {
      const _oldVal = this.object
      this.object = value
      if (needOldValue === true)
        return _oldVal
    }
    else {
      const _oldVal = this.writeAccess(this.propSplit(property), this.object, value)
      if (needOldValue === true)
        return _oldVal
    }
  }

  getPropVal(property?: string) {
    if (property == null || property === '')
      return this.object
    return this.readAccess(this.propSplit(property), this.object)
  }

  private writeAccess(propStairs: string[], reference: any, value: any, propDepth: ReturnType<typeof this.propAnalyze>[] = []): void {
    const nextProp = propStairs.shift()
    if (!nextProp)
      throw new Error('ObjectWrapper: target property is empty')

    const propInfo = this.propAnalyze(nextProp)
    propDepth.push(propInfo)

    let nextPropValue = (propInfo.idx === undefined)
      ? reference[propInfo.key]
      : reference[propInfo.key]?.[propInfo.idx]

    if (!nextPropValue) {
      if (propInfo.idx === undefined) {
        reference[propInfo.key] = {}
        nextPropValue = reference[propInfo.key]
      }
      else {
        reference[propInfo.key] = new Array(Number(propInfo.idx) + 1)
        nextPropValue = reference[propInfo.key][propInfo.idx]
      }

    }

    if (propStairs.length === 0) {
      if (propInfo.idx === undefined)
        reference[propInfo.key] = value
      else
        reference[propInfo.key][propInfo.idx] = value
      return
    }

    this.writeAccess(propStairs, nextPropValue, value)
  }

  private readAccess(propStairs: string[], reference: any): any {
    const propInfo = this.propAnalyze(propStairs.shift()!)
    const _reference = (propInfo.idx === undefined)
      ? reference[propInfo.key]
      : reference[propInfo.key][propInfo.idx]

    if (propStairs.length === 0)
      return _reference

    return this.readAccess(propStairs, _reference)
  }

  private propSplit(property: string) {
    return property.split('.')
  }

  private propAnalyze(property: string) {
    const info = {
      key: property,
      idx: undefined as unknown as number | undefined,
    }
    const lBracketPos = property.indexOf('[')
    if (lBracketPos === -1)
      return info

    const rBracketPos = property.indexOf(']')
    info.idx = Number(property.substring(lBracketPos + 1, rBracketPos))
    info.key = property.substring(0, lBracketPos)
    return info
  }
}

export const PropertyRead = (object: any, property: string) => {
  const ow = new ObjectWrapper(object)
  return ow.getPropVal(property)
}

export const PropertyWrite = (object: any, property: string, value: any) => {
  const ow = new ObjectWrapper(object)
  return ow.setPropVal(property, value, true)
}
