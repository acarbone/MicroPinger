import redis, os, threading, time, sys
from slackclient import SlackClient

# r = redis.StrictRedis(host='localhost', port=6379, db=0)
# p = r.pubsub()
# p.subscribe('test')
#
# while True:
#     message = p.get_message()
#     if message:
#         print "Subscriber: %s" % message['data']
#     time.sleep(1)

def notify(message):
    sc = SlackClient(os.environ["SLACK_TOKEN"])

    sc.api_call(
      "chat.postMessage",
      channel="#general",
      text=message
    )

#notify()


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
