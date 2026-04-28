# Define a Player class that can change its score

class Player:
    def __init__(self, name, score):
        # store the starting name and score
        self.name = name
        self.score = score

    def add_score(self, points):
        # increase the score by the given number of points
        self.score += points

    def reset_score(self):
        # reset the score back to 0
        self.score = 0


# demo / sample usage
player = Player("Shadow", 0)

player.add_score(10)
player.add_score(5)
print("Score before reset:", player.score)

player.reset_score()
print("Score after reset:", player.score)
