# Add a __str__ method to make objects print nicely

class Player:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def __str__(self):
        # return a friendly summary string for this player
        return f"Player {self.name} (score: {self.score})"


# demo / sample usage
p1 = Player("Ghost", 42)
p2 = Player("Cipher", 99)

# printing the objects will now use __str__
print(p1)
print(p2)
