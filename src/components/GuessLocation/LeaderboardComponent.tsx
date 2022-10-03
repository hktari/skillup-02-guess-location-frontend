import React, { useEffect, useState } from 'react'
import { ItemList, LeaderboardItem } from '../../services/interface'
import locationApi from '../../services/locationApi'
import '../../css/components/GuessLocation/LeaderboardComponent.css'
import AvatarPlaceholder from '../../assets/images/avatar-placeholder.png'

type LeaderboardComponentProps = {
    leaderboardItems: LeaderboardItem[]
}

const LeaderboardComponent = ({ leaderboardItems }: LeaderboardComponentProps) => {

    function getRankStyle(rank: number) {
        if (rank === 1) {
            return 'gold'
        } else if (rank === 2) {
            return 'silver'
        } else if (rank === 3) {
            return 'bronze'
        } else { return '' }
    }

    function LeaderboardItemComponent({ item, rank }: { item: LeaderboardItem, rank: number }) {
        return (
            <div className="leaderboard-item">
                <div className={'rank ' + getRankStyle(rank)}>{rank}</div>
                <div className="user-profile-img"><img src={item.user?.imageUrl ?? AvatarPlaceholder}
                    alt={item.user?.firstName} /></div>
                <div className="details">
                    <span className="username">{item.user?.firstName} {item.user?.lastName}</span>
                    <small className="caption">
                        {item.createdDate?.toLocaleString()}
                    </small>
                </div>
                <div className="guess-error text-positive">
                    {item.guessErrorMeters} m
                </div>
            </div>
        )
    }

    return (
        <div className='leaderboard-list'>
            {
                // the list is sorted ASC
                leaderboardItems.map((item, idx) => <LeaderboardItemComponent key={item.id} item={item} rank={idx + 1} />)
            }
        </div>
    )
}

export default LeaderboardComponent