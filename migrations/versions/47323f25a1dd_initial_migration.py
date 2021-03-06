"""initial migration

Revision ID: 47323f25a1dd
Revises: 
Create Date: 2021-08-20 13:43:52.685486

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '47323f25a1dd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('movies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('imdb_id', sa.String(length=20), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('og_title', sa.String(length=50), nullable=True),
    sa.Column('rate', sa.Float(), nullable=True),
    sa.Column('year', sa.SmallInteger(), nullable=True),
    sa.Column('grade', sa.String(length=20), nullable=True),
    sa.Column('time_length', sa.String(length=20), nullable=True),
    sa.Column('genre', sa.String(length=100), nullable=True),
    sa.Column('description', sa.String(length=2000), nullable=True),
    sa.Column('director', sa.String(length=100), nullable=True),
    sa.Column('writers', sa.String(length=150), nullable=True),
    sa.Column('starts', sa.String(length=150), nullable=True),
    sa.Column('image', sa.String(length=1000), nullable=True),
    sa.Column('crawler_time', sa.DateTime(), nullable=True),
    sa.Column('source', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('imdb_id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=64), nullable=True),
    sa.Column('password_hash', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)
    op.create_table('user_movie',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('movie_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['movie_id'], ['movies.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    op.create_table('user_watched_movie',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('movie_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['movie_id'], ['movies.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_watched_movie')
    op.drop_table('user_movie')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    op.drop_table('movies')
    # ### end Alembic commands ###
