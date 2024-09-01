import React, { useEffect, useState } from 'react'
import { ItemList, LeaderboardItem } from '../../services/interface'
import locationApi from '../../services/locationApi'
import '../../css/components/GuessLocation/LeaderboardComponent.css'
import AvatarPlaceholder from '../../assets/images/avatar-placeholder.png'

type LeaderboardComponentProps = {
  leaderboardItems: LeaderboardItem[]
}

const LeaderboardComponent = ({
  leaderboardItems,
}: LeaderboardComponentProps) => {
  function getRankStyle(rank: number) {
    if (rank === 1) {
      return 'gold'
    } else if (rank === 2) {
      return 'silver'
    } else if (rank === 3) {
      return 'bronze'
    } else {
      return ''
    }
  }

  function LeaderboardItemComponent({
    item,
    rank,
  }: {
    item: LeaderboardItem
    rank: number
  }) {
    return (
      <div className="c-leaderboard-item flex items-center gap-4">
        <div
          className={
            'rank grid h-12 w-12 content-center items-center rounded-full text-center font-bold ' +
            getRankStyle(rank)
          }
        >
          {rank}
        </div>
        <div className="overflow-hidden rounded-full">
          <img
            className="h-12 w-12 object-cover"
            src={item.user?.imageUrl ?? AvatarPlaceholder}
            alt={item.user?.firstName}
          />
        </div>
        <div className="grow">
          <div className="text-lg">
            {item.user?.firstName} {item.user?.lastName}
          </div>
          <small className="text-sm">
            {item.createdDate?.toLocaleString()}
          </small>
        </div>
        <div className="text-lg text-patina-400 whitespace-nowrap">{item.guessErrorMeters} m</div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {
        // the list is sorted ASC
        leaderboardItems.map((item, idx) => (
          <LeaderboardItemComponent key={item.id} item={item} rank={idx + 1} />
        ))
      }
    </div>
  )
}

export default LeaderboardComponent
