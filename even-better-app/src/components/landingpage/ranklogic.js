// point tier:
// rank                ||    points
// -------------------------------------------
// Unlucky             ||    x < 1000
// Even Better         ||    1000 < x < 2000
// Lucky Better        ||    2000 < x < 3500
// Even Luckier Better ||    3500 < x < 6000
// Luckiest Better     ||    6000 < x < 9500
// Master Better       ||    9500 < x

var pointTier = [1000,2000,3500,6000,9500]
var betTier = [10,50,150,300]

function rankDetermine (points){
  if (points < pointTier[0]){
    return {rank: 'Unlucky', pointsToNext: pointTier[0]-points}
  }
  else if (points < pointTier[1]){
    return {rank: 'Even Better', pointsToNext: pointTier[1]-points}
  }
  else if (points < pointTier[2]){
    return {rank: 'Lucky Better', pointsToNext: pointTier[2]-points}
  }
  else if (points < pointTier[3]){
    return {rank: 'Even Luckier Better', pointsToNext: pointTier[3]-points}
  }
  else if (points < pointTier[4]){
    return {rank: 'Luckiest Better', pointsToNext: pointTier[4]-points}
  }
  else {
    return {rank: 'Master Better', pointsToNext: 0}
  }
}

function betRankDetermine (bets){
  if (bets < betTier[0]){
    return {rank: 'Small Better', betsToNext: betTier[0] - bets}
  }
  else if (bets < betTier[1]){
    return {rank: 'Medium Better', betsToNext: betTier[1] - bets}
  }
  else if (bets < betTier[2]){
    return {rank: 'Even Better', betsToNext: betTier[2] - bets}
  }
  else if (bets < betTier[3]){
    return {rank: 'Large Better', betsToNext: betTier[3] - bets}
  }
  else {
    return {rank: 'Savvy Better', betsToNext: 0}
  }
}

module.exports = {
  rankDetermine: rankDetermine,
  betRankDetermine: betRankDetermine
}