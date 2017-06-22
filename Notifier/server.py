import redis, os, threading, time
from slackclient import SlackClient

def notify(message):
    sc = SlackClient(os.environ["SLACK_TOKEN"])

    sc.api_call(
      "chat.postMessage",
      channel="#general",
      text=message
    )

class Listener(threading.Thread):
    def __init__(self, r, channels):
        threading.Thread.__init__(self)
        self.redis = r
        self.pubsub = self.redis.pubsub(ignore_subscribe_messages=True)
        self.pubsub.subscribe(channels)

        while True:
            message = self.pubsub.get_message()
            if message:
                notify(message['data'])
            time.sleep(0.001)

r = redis.Redis('redis', decode_responses=True)
client = Listener(r, ['micro_pinger'])
client.start()
