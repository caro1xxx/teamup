import re
import ipaddress


def isEmpty(data):
  return data != ''

def isEmail(data):
  pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
  return re.match(pattern, data) is not None

def isIpV4(data):
  try:
    ipaddress.IPv4Address(data)
    return True
  except ipaddress.AddressValueError:
    return False