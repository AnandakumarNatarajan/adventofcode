# define the dimensions of the grid
ROWS = 5
COLS = 5

# define the grid of tree heights
heights = [
    [3, 0, 3, 7, 3],
    [2, 5, 5, 1, 2],
    [6, 5, 3, 3, 2],
    [3, 3, 5, 4, 9],
    [3, 5, 3, 9, 0]
]

# initialize a counter for the number of trees that are visible from all four directions
num_visible_trees = 0

# iterate over each row in the grid
for r in range(ROWS):
    # initialize the current maximum height to the height of the tree at the top-left corner of the grid
    max_height = heights[0][0]

    # iterate over each column in the row
    for c in range(COLS):
        # update the current maximum height if necessary
        if heights[r][c] > max_height:
            max_height = heights[r][c]

        # check whether the tree at the current location is visible from all four directions
        is_visible = True
        for i in range(r, -1, -1):
            for j in range(c, -1, -1):
                # check whether there is a taller tree behind the current location
                if heights[i][j] > heights[r][c]:
                    is_visible = False
                    break
        for i in range(c, -1, -1):
            # check whether there is a taller tree to the left of the current location
            if heights[r][i] > heights[r][c]:
                is_visible = False
                break
        for i in range(r, ROWS):
            for j in range(c, COLS):
                # check whether there is a taller tree behind the current location
                if heights[i][j] > heights[r][c]:
                    is_visible = False
                    break
        for i in range(c, COLS):
            # check whether there is a taller tree to the right of the current location
            if heights[r][i] > heights[r][c]:
                is_visible = False
                break

        # increment the counter if the tree at the current location is visible from all four directions
        if is_visible:
            num_visible_trees += 1

# print the number of trees that are visible from all four directions
print(num_visible_trees)
