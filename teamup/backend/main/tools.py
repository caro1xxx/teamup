import random

def randomNumber():
    num_digits = random.randint(4, 6)
    min_value = 10 ** (num_digits - 1)
    max_value = (10 ** num_digits) - 1
    return random.randint(min_value, max_value)


def userDeviceSystem(user_agent):
    if 'Windows' in user_agent:
        return 'Windows'
    elif 'Macintosh' in user_agent:
        return 'Mac'
    elif 'Linux' in user_agent:
        return 'Linux'
    elif 'Android' in user_agent:
        return 'Android'
    elif 'iOS' in user_agent:
        return 'iOS'
    else:
        return 'Unknown'