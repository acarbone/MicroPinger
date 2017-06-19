import redis
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

def notify(data):
    slack_token = os.environ[""]
    sc = SlackClient(slack_token)

    sc.api_call(
      "chat.postMessage",
      channel="#python",
      text="Hello from Python! :tada:"
    )
